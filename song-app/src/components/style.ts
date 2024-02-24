
import  styled from "@emotion/styled";
import {css} from "@emotion/react";
import { space, fontSize, color } from 'styled-system'
const darkest =  "#343a40";
const dark = "#495057";
const medium = "#ced4da";
const light = "#f1f3f5";
const theme = "#1098ad";
const accent = "#ffa94d";

interface ButtonProps {
    children: React.ReactNode;
    mt?: number; 
    mx?: string;// Add optional type for margin-top
    fontSize?: number;
    color?: string;

  }
interface NavProps {
    bg:string;
}
 export const globalStyles = css`
    body, html {
      background-color: ${dark}; // Change color here
    }`
const Button = styled.button<ButtonProps>`

color: ${light};
font-size: 2rem;
border: 2px solid ${dark};
background-color: ${dark};
padding: 1rem;
margin-top:2rem;
cursor: pointer;
width:10rem;
border-radius: 15px;

&:hover{
    
    box-shadow: 0 2.4rem 2.4rem rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}



`
export const NavBar = styled.nav`


margin-top: 1rem;
height: 5rem;
display: flex;
gap: 3rem;
justify-content:center;



`

export const Main = styled.main`
margin-top: 1rem;
height: calc(100vh - 7.2rem - 3 * 2rem);
display: flex;
gap: 2.4rem;
justify-content: center;
`
export const Box = styled.div`
width: 42rem;
max-width: 42rem;
background-color: #2b3035;
border-radius: 0.9rem;
overflow: auto;
position: relative;

`
export const StatBox = styled(Box)`
padding:5rem;
padding-bottom:2rem;
width:80rem;
max-width:80rem;`
export const Nav = styled.div<NavProps>`
width:10rem;
background-color: ${props => props.bg};
border-radius: 0.9rem;
cursor:pointer;
padding:1rem;
padding-left:2.5rem;
a{
text-decoration:none;
color: white;
font-size:2rem;
}
p{
}


`
export const Input = styled.input`

justify-self: center;
border: none;
padding: 1.1rem ;
font-size: 1.4rem;
border-radius: 0.7rem;
width: 15rem;
transition: all 0.3s;
color: white;
background-color: ${dark};
&:focus{
    outline: none;
    box-shadow: 0 2.4rem 2.4rem rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}
&::placeholder{
 color: theme;
}


`
export const SongList= styled.ul`
list-style: none;
padding: 0.8rem 0;

`
export const Song = styled.li`
--color-background-100: #343a40;
position: relative;
display: flex;
font-size: 1.6rem;
align-items: center;
color: #dee2e6;
padding: 1.6rem 3.2rem;
border-bottom: 1px solid var(--color-background-100);
justify-content: space-between;
p{
    display:flex;
    align-items: center;
    gap:0.8rem;
    padding:0;
    margin: 0;
    margin-top:1rem;
    color:#adb5bd;
    
}
h4{
    font-size:1.8rem;
    justify-content:space-between;
    padding:0;
    margin:0;

}


`
export const Btn = styled.span`
cursor: pointer;
transition: 0.3s;


`
export default Button;

export const InputList = styled.div`
 display:flex;
 flex-direction: column;
 gap:2rem;
 justify-content: center;
 align-items: center;
 margin-top:1rem;
 h3{
    font-size:2.2rem;
    margin-bottom:2rem;
 }
 
`
export const InputDiv = styled.div`
display:flex;
justify-content:space-around;
align-itmes:center;
gap:4rem;
p{
    align-self:center;
    font-size:1.5rem;

}
`
export const BackButton = styled.div`
width: 4rem;
background-color:#6741d9;
margin-top:2rem;
margin-left:3rem;
border-radius:10rem;
font-size:3rem;
cursor: pointer;
padding-left: 0.5rem;
padding-bottom:0.4rem;



`
export const TotalBar = styled.div`

  display:flex;
  min-height:10rem;
  height:10rem;
  justify-content:space-around;
  align-items:center;
  margin-bottom:1rem;
  border-radius:1rem;
  
`
export const TotalDiv = styled.div`
background-color:#2b3035;
padding:1rem;
border-radius:0.5rem;
height:7rem;
padding:2rem;
outline: none;
box-shadow: 0 2.4rem 2.4rem rgba(0, 0, 0, 0.1);
transform: translateY(-2px);

p{
    font-size:1.2rem;
    color: #adb5bd
}
h3{
    font-size:2rem;
}
`
export const TotalDetail = styled.div`

height: calc(100vh - 10rem - 7.2rem - 5rem - 5 * 2rem);
display:flex;
justify-content:space-around;
padding:1rem;
border-radius:1rem;

`
export const EachTotal = styled(Box)`
width:20rem;
min-width:20rem;
margin: 2rem 0rem;
outline: none;
box-shadow: 0 2.4rem 2.4rem rgba(0, 0, 0, 0.1);
transform: translateY(-2px);
overflow:auto;

`
export const SongTile =styled(Song)`
padding:1rem;`
export const Loading = styled.p`
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 600;
    margin: 4.8rem;
  `