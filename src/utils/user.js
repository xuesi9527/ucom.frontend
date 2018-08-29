export const getYearsFromBirthday = (value) => {
  if (value) {
    const birthday = new Date(value);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return null;
};

export const getUserUrl = (userId) => {
  if (userId) {
    return `/user/${userId}`;
  }

  return null;
};

export const getYearOfDate = date => (
  date.split('-')[0]
);

export const getUserName = (user) => {
  if (user) {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    }

    return user.account_name;
  }

  return null;
};
