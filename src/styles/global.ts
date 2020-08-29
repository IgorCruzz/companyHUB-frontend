import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
html {
  @media (max-width: 650px) { 
    font-size: 50%; 
  }
  font-size: 62.5%;  
}
}
html, body, #root {
  height: 100%;   
}
body {
  font: 1.6rem 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased; 
  background:  #7159C1;
} 
input, button, textarea {
  font: 18px 'Roboto', sans-serif;
}
button {
  cursor: pointer;
}
`
