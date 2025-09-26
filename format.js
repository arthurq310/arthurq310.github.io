export const formatName = (fullName) => {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1]}`;
};

export const formatEmail = (email) => {
  const username = email.split("@")[0];
  return `@${username}`;
};

export const formatBody = (body) => {
  return body.length > 140 ? body.slice(0, 140) + "..." : body;
};
