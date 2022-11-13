// simple util that issues a console.error() in development mode, and is silent in all others
export const issueWarningMessage = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      `usePleaseStay: ${message} This message will be shown in development only.`
    );
  }
};
