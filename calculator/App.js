import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import supportedCommands from 'react-native/Libraries/Components/TextInput/TextInputNativeCommands';
import { 
  mainDiv,
  bgDiv,
  inputDiv,
  numDiv,
  colorSwitchDiv,
  sunStyle,
  moonStyle,
  row1, 
  row2,
  red,
  green,
  pow,
  white,
  row3,
  row4,
  row5,
  btn,
} from './Styles/style.js';

export default function App() {
  const [ bgColor, setBgColor ] = useState('#FFFFFF');
  const [ textColor, setTextColor ] = useState('#22252D');
  const [ btnColor, setBtnColor ] = useState('#F9F9F9');
  const [ isDark, setIsDark ] = useState(false);
  const [ numArray, setNumArray ] = useState([]);
  const [ pastOp, setPastOp] = useState([]);
  const [ displayNum, setNumDisplay] = useState('');
  const [ lastAC, setLastAC ] = useState(false);
  
  
  const handleSwitch = (color) => {
    if(color === 'moon'){
      setIsDark(true);
      setBgColor('#22252D');
      setTextColor('#FFFFFF');
      setBtnColor('#2A2D37');
    } else if(color === 'sun'){
      setIsDark(false);
      setBgColor('#FFFFFF');
      setTextColor('#22252D');
      setBtnColor('#F9F9F9');
    }
  }

  const handleNumInput = (num) =>{
    if(num === '0'){
      if(lastAC){
        setNumDisplay('0');
      } else setNumDisplay(displayNum + '0');
    } else if(num === '1'){
      if(lastAC){
        setNumDisplay('1');
      } else setNumDisplay(displayNum + '1');
    } else if(num === '2'){
      if(lastAC){
        setNumDisplay('2');
      } else setNumDisplay(displayNum + '2');
    } else if(num === '3'){
      if(lastAC){
        setNumDisplay('3');
      } else setNumDisplay(displayNum + '3');
    } else if(num === '4'){
      if(lastAC){
        setNumDisplay('4');
      } else setNumDisplay(displayNum + '4');
    } else if(num === '5'){
      if(lastAC){
        setNumDisplay('5');
      } else setNumDisplay(displayNum + '5');
    } else if(num === '6'){
      if(lastAC){
        setNumDisplay('6');
      } else setNumDisplay(displayNum + '6');
    } else if(num === '7'){
      if(lastAC){
        setNumDisplay('7');
      } else setNumDisplay(displayNum + '7');
    } else if(num === '8'){
      if(lastAC){
        setNumDisplay('8');
      } else setNumDisplay(displayNum + '8');
    } else if(num === '9'){
      if(lastAC){
        setNumDisplay('9');
      } else setNumDisplay(displayNum + '9');
    } else if(num === '.'){
      if(lastAC){
        setNumDisplay('0.');
      } else setNumDisplay(displayNum + '.');
      setNumDisplay(displayNum + '.');
    }

    setLastAC(false);
  }

  const handleAC = () =>{
    setNumDisplay('');
    setNumArray([]);
    setPastOp([]);
    setLastAC(true);
  }
  
  const handleRemove = () =>{
    setNumDisplay(displayNum.slice(0, -1));
    setLastAC(false);
  }

  const handleOperation = (op) => {
    if(pastOp.length != 0) setPastOp([]);
    const aux = numArray;
    if(displayNum !== '') aux.push(displayNum);
    
    var remove = true;

    if(op === 'suma'){
      aux.push('+');
    } else if(op === 'resta'){
      if(displayNum === ''){
        setNumDisplay('-');
        remove=false;
      } else aux.push('-');
    } else if(op === 'mult'){
      aux.push('x');
    } else if(op === 'div'){
      aux.push('/');
    } else if(op === 'pow'){
      aux.push('^');
    } else if(op === 'mod'){
      aux.push('%');
    }

    setNumArray(aux);
    if(remove) setNumDisplay('');
    setLastAC(false);
  }

  const showResult = () => {
    const aux = numArray;
    aux.push(displayNum);
    setNumArray(aux);

    var result = parseInt(numArray[0]);

    for(var i = 1; i < numArray.length; ++i){
      if(numArray[i] === '+'){
        if(i+1 !== numArray.length){
          result += parseInt(numArray[i+1]);
        }
      } else if(numArray[i] === '-'){
        if(i+1 !== numArray.length){
          result -= parseInt(numArray[i+1]);
        }
      } else if(numArray[i] === 'x'){
        if(i+1 !== numArray.length){
          result *= parseInt(numArray[i+1]);
        }
      } else if(numArray[i] === '/'){
        if(i+1 !== numArray.length){
          result /= parseInt(numArray[i+1]);
        }
      } else if(numArray[i] === '%'){
        if(i+1 !== numArray.length){
          result = result%parseInt(numArray[i+1]);
        }
      } else if(numArray[i] === '^'){
        if(i+1 !== numArray.length){
          result = Math.pow(result, numArray[i+1]);
        }
      }
    }
    var saux;
    if(result%1 !== 0) saux = result.toFixed(2).toString();
    else saux = result.toString();
    setPastOp(numArray);
    setNumArray([]);
    setNumDisplay(saux);
    setLastAC(true);  
  }

  return (
    <View style={[mainDiv.container, { backgroundColor: bgColor }]}>
      <View style={bgDiv.container}>
        <View style={[colorSwitchDiv.container, {backgroundColor: btnColor}]}>
          <TouchableOpacity onPress={() => handleSwitch('sun')}>
            <Image 
              source={require('./Images/sun.png')}
              style={
                isDark? 
                [sunStyle.Image, { opacity: 0.5}] : sunStyle.Image
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSwitch('moon')}>
            <Image
              source={require('./Images/moon.png')}
              style={
                isDark? 
                moonStyle.Image : 
                [moonStyle.Image, { opacity: 0.5}]
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={inputDiv.container}>
        <Text style={{color: textColor, fontSize:30}}>{
          pastOp.length > 0 ? 
            pastOp.map((num) =>{return num})
          :
            numArray.map((num) =>{return num})
        }</Text>
        <Text style={[inputDiv.text, { color: textColor}]}>{ displayNum }</Text>
      </View>
      <View style={[numDiv.container, { backgroundColor: btnColor}]}>
        <View style={row1.container}>
          <View style={[green.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={handleAC} style={btn.container}>
              <Text style={green.text}>AC</Text> 
            </TouchableOpacity>
          </View>
          <View style={[pow.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleOperation('pow')} style={btn.container}>
              <Text style={pow.text}>^</Text>
            </TouchableOpacity>
          </View>
          <View style={[green.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleOperation('mod')} style={btn.container}>
              <Text style={green.text}>%</Text>
            </TouchableOpacity>
          </View>
          <View style={[red.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleOperation('div')} style={btn.container}>
              <Text style={red.text}>/</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={row2.container}>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('7')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>7</Text> 
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('8')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>8</Text>
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('9')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={[red.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleOperation('mult')} style={btn.container}>
              <Text style={red.text}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={row3.container}>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('4')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>4</Text> 
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('5')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>5</Text>
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('6')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={[red.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleOperation('resta')} style={btn.container}>
              <Text style={red.text}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={row4.container}>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('1')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>1</Text> 
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('2')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>2</Text>
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('3')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={[red.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleOperation('suma')} style={btn.container}>
              <Text style={red.text}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={row5.container}>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={handleRemove} style={btn.container}>
              {
                //find remove image.
              }
              <Text style={[white.text, {color: textColor}]}>R</Text> 
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('0')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={[white.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => handleNumInput('.')} style={btn.container}>
              <Text style={[white.text, {color: textColor}]}>.</Text>
            </TouchableOpacity>
          </View>
          <View style={[red.container, {backgroundColor:bgColor}]}>
            <TouchableOpacity onPress={() => showResult()} style={btn.container}>
              <Text style={red.text}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" /> 
    </View>
  );
}
