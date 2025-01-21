export function createStyleTag(style, nonce, suffix) {
  const kameoStyleTag = document.querySelector(`style[data-kameo-style${suffix ? `-${suffix}` : ''}]`);

  if (kameoStyleTag !== null) {
    return kameoStyleTag;
  }

  const styleNode = document.createElement('style');

  if (nonce) {
    styleNode.setAttribute('nonce', nonce);
  }

  styleNode.setAttribute(`data-kameo-style${suffix ? `-${suffix}` : ''}`, '');
  styleNode.innerHTML = style;
  document.getElementsByTagName('head')[0].append(styleNode);
  
  return styleNode;
}
