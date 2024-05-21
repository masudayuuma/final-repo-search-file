import { atom } from 'recoil';

// usernameStateのアトム
export const usernameState = atom<string>({
    key: 'usernameState',
    default: '',
});

// emailStateのアトム（サンプルとして追加）
export const emailState = atom<string>({
    key: 'emailState',
    default: '',
});

// userStateのアトム
// headerでdateを保持するためのアトム。将来的に変更の余地あり。
// [user].jsでも保持したデータが使われる
// any以外にすると、型が合わないエラーが出る
export const userState = atom<any | null>({
    key: 'userState',
    default: null,
    // effects_UNSTABLE: [
    //     ({ onSet }) => {
    //         onSet(async (newUsername) => {
    //             try {
    //                 const response = await fetch(`https://api.github.com/users/${newUsername}`);
    //                 const userData = await response.json();
    //                 console.log(userData); // デバッグ用ログ
    //             } catch (error) {
    //                 console.error('Error fetching user data:', error);
    //             }
    //         });
    //     },
    // ],
});
