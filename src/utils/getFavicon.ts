export const getFavicon = () : HTMLLinkElement | null => {
    const nodeList = document.getElementsByTagName('link');
    for (let i = 0; i < nodeList.length; i++) {
      if (
        nodeList[i].getAttribute('rel') === 'icon' ||
        nodeList[i].getAttribute('rel') === 'shortcut icon'
      ) {
        return nodeList[i];
      }
    }
    return null;
  }