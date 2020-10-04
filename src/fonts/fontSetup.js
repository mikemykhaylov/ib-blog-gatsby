import HeeboVariableWoff2 from './Heebo-Variable.woff2';
import RalewayVariableWoff2 from './Raleway-Variable.woff2';

const fontFaces = `
@font-face {
  font-family: 'Heebo';
  src: url(${HeeboVariableWoff2}) format('woff2-variations');
}
@font-face {
  font-family: 'Raleway';
  src: url(${RalewayVariableWoff2}) format('woff2-variations');
}`;

export default fontFaces;
