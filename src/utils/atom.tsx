import { atom } from 'recoil';

export const usernameState = atom<string>({
    key: 'usernameState',
    default: '',
});

// emailStateのアトム（サンプルとして追加)
export const emailState = atom<string>({
    key: 'emailState',
    default: '',
});

// userStateのアトム
// headerでdateを保持するためのアトム。将来的に変更の余地あり。
// [user].jsでも保持したデータが使われる
// any以外にすると、型が合わないエラーが出る
export const userDataState = atom<any | null>({
    key: 'userState',
    default: null,
});
