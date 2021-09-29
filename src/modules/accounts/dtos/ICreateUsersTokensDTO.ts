interface ICreateUsersTokensDTO {
  refresh_token: string;
  expire_date: Date;
  user_id: string;
}

export { ICreateUsersTokensDTO };
