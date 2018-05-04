export const pollTypes = {
  REGISTRATION: 1
};

export function voteToActionPayload(type, poll, { author }) {
  const timestamp = new Date().getTime();
  let actionPayload = { timestamp, poll };

  switch (type) {
    default:
      actionPayload = { ...actionPayload, author };
  }

  return actionPayload;
}
