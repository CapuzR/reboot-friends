import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Friend { 'name' : string, 'canisterId' : Principal }
export interface FriendRequest {
  'id' : bigint,
  'name' : string,
  'sender' : Principal,
  'message' : string,
}
export type FriendRequestError = { 'AlreadyRequested' : null } |
  { 'AlreadyFriend' : null } |
  { 'NotEnoughCycles' : null };
export type FriendRequestResult = { 'ok' : null } |
  { 'err' : FriendRequestError };
export interface FriendsCanister {
  'reboot_friends_getFriendRequests' : ActorMethod<[], Array<FriendRequest>>,
  'reboot_friends_getFriends' : ActorMethod<[], Array<Friend>>,
  'reboot_friends_handleFriendRequest' : ActorMethod<[bigint, boolean], Result>,
  'reboot_friends_receiveFriendRequest' : ActorMethod<
    [string, string],
    FriendRequestResult
  >,
  'reboot_friends_removeFriend' : ActorMethod<[Principal], Result>,
  'reboot_friends_sendFriendRequest' : ActorMethod<
    [Principal, string],
    FriendRequestResult
  >,
  'reboot_supportedStandards' : ActorMethod<
    [],
    Array<{ 'url' : string, 'name' : string }>
  >,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE extends FriendsCanister {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
