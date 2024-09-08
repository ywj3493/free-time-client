type UserUpdateFormData = {
  name: string;
  phone: string;
  preferredNoticeChannel: PreferredNoticeChannel;
};

type UserResponse = {
  userId: number;
  name: string;
  email: string;
  phone?: string;
  preferredNoticeChannel: PreferredNoticeChannel;
};
