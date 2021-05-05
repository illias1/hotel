export const getCookieUser = (user: any) => {
  if (!user) {
    return null;
  }
  return "username" in user
    ? {
        username: user.username,
        email: user.attributes.email,
        name: user.attributes.name,
        phone: user.attributes["custom:phone"],
        stripeId: user.attributes["custom:stripeId"],
      }
    : null;
};
