const axios = require("axios");
import { config } from '../config';
import { trycatch } from '../utils/util';

// const { chatUrl, chatGroupUrl, chatMessageUrl, chatLoginUrl, loginUser, loginPass } = require("./config/config");
// const { trycatch } = require("../utils/util");


export class Chat {
    userId: any;
    authToken: any;
    cache: any;

    // wrappedAxiosPost = trycatch(axios.post);
    // wrappedAxiosGet = trycatch(axios.get);

    async login(): Promise<any> {
        if (this.userId && this.authToken)
            return { userId: this.userId, authToken: this.authToken };
        const { result } = await axios.post(`${config.chat.chatUrl}/${config.chat.chatLoginUrl}`,
            { username: config.chat.loginUser, password: config.chat.loginPass });

        // const { result } = await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatLoginUrl}`,
        // { username: config.chat.loginUser, password: config.chat.loginPass });
        if (result) {
            if (result.data && result.data.status === "success") {
                const { data } = result;
                const { userId, authToken } = data.data;
                this.userId = userId;
                this.authToken = authToken;
                return [userId, authToken];
            } else {
                console.error(result);
            }
        }
    }

    async getAuthHeaders() {
        const [userId, authToken] = await this.login();
        const headers = {
            'X-Auth-Token': "authToken",
            'X-User-Id': "userId"
        };
        return headers;
    };

    getAllowedGroupTitleFromText(title: string) {
        if (this.cache && this.cache[title])
            return this.cache[title];

        const isAlphaNumeric = 'a-zA-Z0-9';
        const isHebrewChars = 'א-ת';
        const isAllowedSpecialChars = '_.-';
        const regexString = `^${isAlphaNumeric}${isHebrewChars}${isAllowedSpecialChars}`;
        const regexExppresion = new RegExp(`[${regexString}]`, 'g');
        const allowedTitle = title.replace(regexExppresion, str => str.split('').map(() => '.').join(''));

        this.cache = this.cache || {};
        this.cache[title] = allowedTitle;

        return this.cache[title];
    }

    async createGroup(groupName: string, members: any) {
        const authHeaders = await this.getAuthHeaders();
        const name = this.getAllowedGroupTitleFromText(groupName);
        const { result } = await axios.post(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.create`, { name, members }, { headers: { ...authHeaders } });

        // const { result } = await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.create`, { name, members }, { headers: { ...authHeaders } });
        if (result) {
            const { _id: groupId } = result.data.group;
            return groupId;
        }
    };

    async getGroupMembers(roomId: string) {
        const authHeaders = await this.getAuthHeaders();
        const { result } = await axios.get(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.info?roomId=${roomId}`, { headers: { ...authHeaders } });

        // const { result } = await wrappedAxiosGet(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.info?roomId=${roomId}`, { headers: { ...authHeaders } });
        if (result && result.data) {
            const { usernames } = result.data.group;
            return usernames;
        }
        return false;
    };


    async addMemberToGroupFactory(roomId: string, member: string) {
        const authHeaders = await this.getAuthHeaders();
        const { result } = await axios.post(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.invite`, { roomId, username: member }, { headers: authHeaders });

        // const { result } = await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.invite`, { roomId, username: member }, { headers: authHeaders });

        return result;
    }

    addMembersToGroup(roomId: string, members: string[]) {
        const promises = members.map(member => this.addMemberToGroupFactory(roomId, member));
        return Promise.all(promises);
    }


    // const addMemberToGroupFactory = roomId => async member => {
    //     const authHeaders = await this.getAuthHeaders();
    //     return await wrappedAxiosPost(`${chatUrl}/${chatGroupUrl}.invite`, { roomId, username: member }, 
    //     { headers: { ...authHeaders } });
    // };

    // const addMembersToGroup = async (roomId, members) => {
    //     const addMemberToRoom = addMemberToGroupFactory(roomId);
    //     const results = await Promise.all(members.map(addMemberToRoom));
    //     return results.map(({ result }) => result);
    // };

    async removeMemberFromGroupFactory(roomId: string, member: string) {
        const authHeaders = await this.getAuthHeaders();
        return member !== config.chat.loginUser ? await axios.post(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.kick`, { roomId, username: member }, { headers: { ...authHeaders } }) : true;

        // return member !== config.chat.loginUser ? await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.kick`, { roomId, username: member }, { headers: { ...authHeaders } }) : true;
    };

    removeMembersFromGroup(roomId: string, members: string[]) {
        const promises = members.map(member => this.removeMemberFromGroupFactory(roomId, member));
        return Promise.all(promises);
    };

    /**
     * return every item in arr1 that doesnt exist in arr2
     * @param {*} arr1 
     * @param {*} arr2 
     */
    getNonItercectingItems(arr1: any[], arr2: any[]) {
        const symmetricDifference: any[] = [];
        arr1.forEach(arr1Item => {
            !arr2.map(item => item.toLowerCase()).includes(arr1Item.toLowerCase()) ? symmetricDifference.push(arr1Item) : null;
        });
        return symmetricDifference;
    };

    async setRoomMembers(roomId: string, members: any) {
        const currentGroupMembers = await this.getGroupMembers(roomId);
        if (currentGroupMembers && currentGroupMembers.length > 0) {
            const membersToRemove = this.getNonItercectingItems(currentGroupMembers, members);
            const membersToAdd = this.getNonItercectingItems(members, currentGroupMembers);
            await this.removeMembersFromGroup(roomId, membersToRemove);
            await this.addMembersToGroup(roomId, membersToAdd);
        }
    };

    async closeGroup(roomId: string) {
        const authHeaders = await this.getAuthHeaders();
        const { result } = await axios.post(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.archive`, { roomId }, { headers: { ...authHeaders } });

        // const { result } = await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.archive`, { roomId }, { headers: { ...authHeaders } });
        return result;
    }

    async renameGroup(roomId: string, groupName: string) {
        const authHeaders = await this.getAuthHeaders();
        const name = this.getAllowedGroupTitleFromText(groupName);
        const { result } = await axios.post(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.rename`, { roomId, name }, { headers: { ...authHeaders } });

        // const { result } = await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatGroupUrl}.rename`, { roomId, name }, { headers: { ...authHeaders } });
        return result;
    }

    async sendMessageToGroup(roomId: string, text: string) {
        const authHeaders = await this.getAuthHeaders();
        const { result } = await axios.post(`${config.chat.chatUrl}/${config.chat.chatMessageUrl}.postMessage`, { channel: `#${roomId}`, text }, { headers: { ...authHeaders } });

        // const { result } = await wrappedAxiosPost(`${config.chat.chatUrl}/${config.chat.chatMessageUrl}.postMessage`, { channel: `#${roomId}`, text }, { headers: { ...authHeaders } });
        return result;
    }
}


// module.exports = { createGroup, setRoomMembers, closeGroup, renameGroup, sendMessageToGroup };