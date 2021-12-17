const initialModalState = {
  notificationModal: false,
  commentModal: false,
  newPost: [],
};

const reducer = (state = initialModalState, action) => {
  switch (action.type) {
    case "NOTIFICATION_MODAL":
      return {
        ...state,
        notificationModal: !state.notificationModal,
      };
    case "COMMENT_MODAL":
      return {
        ...state,
        commentModal: !state.commentModal,
      };
    default:
      return state;
  }
};

export default reducer;
