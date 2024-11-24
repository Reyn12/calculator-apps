import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Tema warna untuk aplikasi
const colors = {
  // Warna utama
  primary: '#e74c3c',    // Merah untuk operator
  secondary: '#2ecc71',  // Hijau untuk special buttons
  accent: '#ff9f0a',     // Orange untuk tombol =
  
  // Warna tema gelap
  dark: {
    background: '#090a1a',
    surface: '#1f1e1e',
    button: '#313131',
    text: '#fff'
  },
  
  // Warna tema terang
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    button: '#f0f0f0',
    text: '#000'
  },
  
  // Warna teks
  text: {
    dark: '#666',
    light: '#999'
  }
};

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [displayFormula, setDisplayFormula] = useState("");
  const [inputNumber, setInputNumber] = useState("");

  // Mendapatkan warna berdasarkan tema
  const theme = isDarkMode ? colors.dark : colors.light;

  const buttons = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['backspace', '0', '.', '=']
  ];

  const calculateResult = (prev: string, current: string, op: string): string => {
    const p = parseFloat(prev);
    const c = parseFloat(current);
    let result = 0;

    switch (op) {
      case "+":
        result = p + c;
        break;
      case "-":
        result = p - c;
        break;
      case "×":
        result = p * c;
        break;
      case "÷":
        result = p / c;
        break;
      default:
        return current;
    }

    return result.toString();
  };

  const formatFormula = (formula: string): React.ReactNode[] => {
    if (!formula) return [];
    
    return formula.split(' ').map((part, index) => {
      const isOperator = ['÷', '×', '-', '+', '='].includes(part);
      // Skip jika part adalah 'backspace'
      if (part === 'backspace') return null;
      
      return (
        <Text key={index} style={{
          color: isOperator ? colors.primary : colors.text[isDarkMode ? 'dark' : 'light'],
          fontSize: 30,
          fontWeight: isOperator ? 'bold' : 'normal',
        }}>
          {part + ' '}
        </Text>
      );
    }).filter(Boolean); // Hapus null values
  };

  const handleNumber = (num: string) => {
    if (showResult) {
      setCurrentNumber(num);
      setDisplayFormula(num);
      setInputNumber(num);
      setShowResult(false);
      return;
    }

    if (operation && currentNumber === previousNumber) {
      // Input angka pertama setelah operator
      setInputNumber(num);
      const formula = previousNumber + " " + operation + " " + num;
      setDisplayFormula(formula);
      const result = calculateResult(previousNumber, num, operation);
      setCurrentNumber(result);
    } else {
      // Input angka berikutnya
      const newInput = inputNumber === "0" ? num : inputNumber + num;
      setInputNumber(newInput);
      
      if (operation) {
        const formula = previousNumber + " " + operation + " " + newInput;
        setDisplayFormula(formula);
        const result = calculateResult(previousNumber, newInput, operation);
        setCurrentNumber(result);
      } else {
        setCurrentNumber(newInput);
        setDisplayFormula(newInput);
      }
    }
  };

  const handleOperation = (op: string) => {
    if (op === "=") {
      // Tampilkan formula lengkap dengan = dan hasil di bawahnya
      setDisplayFormula(previousNumber + " " + operation + " " + inputNumber + " =");
      const result = calculateResult(previousNumber, inputNumber, operation);
      setCurrentNumber(result);
      setShowResult(true);
      return;
    }
    
    if (op === "AC") {
      setCurrentNumber("0");
      setPreviousNumber("");
      setOperation("");
      setShowResult(false);
      setDisplayFormula("");
      setInputNumber("");
      return;
    }

    if (op === "backspace") {
      // Reset showResult jika masih true
      if (showResult) {
        setShowResult(false);
        // Kembali ke state sebelum =
        setDisplayFormula(previousNumber + " " + operation + " " + inputNumber);
        return;
      }

      // Jika ada input number setelah operator
      if (operation && inputNumber !== "0") {
        if (inputNumber.length <= 1) {
          setInputNumber("0");
          setCurrentNumber(previousNumber);
          setDisplayFormula(previousNumber + " " + operation);
        } else {
          const newInput = inputNumber.slice(0, -1);
          setInputNumber(newInput);
          setDisplayFormula(previousNumber + " " + operation + " " + newInput);
          const result = calculateResult(previousNumber, newInput, operation);
          setCurrentNumber(result);
        }
        return;
      }

      // Jika hanya ada operator (tanpa angka kedua)
      if (operation && inputNumber === "0") {
        setOperation("");
        setInputNumber(previousNumber);
        setCurrentNumber(previousNumber);
        setDisplayFormula(previousNumber);
        return;
      }

      // Menghapus angka pertama
      if (currentNumber.length <= 1) {
        // Reset semua state ke "0"
        setInputNumber("0");
        setCurrentNumber("0");
        setPreviousNumber("");
        setOperation("");
        setDisplayFormula("0");
        setShowResult(false);
        return;
      } else {
        const newNumber = currentNumber.slice(0, -1);
        setInputNumber(newNumber);
        setCurrentNumber(newNumber);
        setDisplayFormula(newNumber);
      }
      return;
    }

    setOperation(op);
    setPreviousNumber(currentNumber);
    setInputNumber(currentNumber);
    setDisplayFormula(currentNumber + " " + op);
  };

  const renderButton = (item: string) => {
    const isOperator = ['÷', '×', '-', '+', '='].includes(item);
    const isSpecial = ['AC', '+/-', '%'].includes(item);
    
    if (item === 'backspace') {
      return (
        <MaterialCommunityIcons 
          name="backspace-outline" 
          size={24}
          color={colors.secondary}
        />
      );
    }
    
    return (
      <Text style={{
        color: isSpecial ? colors.secondary : (isOperator ? colors.primary : theme.text),
        fontSize: 26,
        fontWeight: '500',
      }}>
        {item}
      </Text>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      
      {/* Header dengan toggle theme dan profile */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
        position: 'relative',
      }}>
        {/* Hamburger Menu */}
        <TouchableOpacity 
          style={{
            backgroundColor: colors.dark.button,
            padding: 10,
            borderRadius: 20,
            width: 44,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons 
            name="menu-outline"
            size={24}
            color={colors.dark.text}
          />
        </TouchableOpacity>

        {/* Toggle Theme di tengah */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.dark.button,
          padding: 10,
          borderRadius: 20,
          gap: 20,
          width: 100,
          justifyContent: 'center',
        }}>
          <TouchableOpacity 
            onPress={() => setIsDarkMode(true)}
            style={{
              opacity: isDarkMode ? 1 : 0.5
            }}
          >
            <Ionicons 
              name="moon"
              size={24} 
              color={colors.dark.text}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setIsDarkMode(false)}
            style={{
              opacity: isDarkMode ? 0.5 : 1
            }}
          >
            <Ionicons 
              name="sunny"
              size={24} 
              color={colors.dark.text}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Button di kanan */}
        <TouchableOpacity 
          onPress={() => router.push('/profile')}
          style={{
            backgroundColor: colors.dark.button,
            padding: 10,
            borderRadius: 20,
            width: 44,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons 
            name="person-outline"
            size={24} 
            color={colors.dark.text}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

      {/* Calculator Display */}
      <View style={{
        paddingRight: 30,
        marginBottom: 20,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          {formatFormula(displayFormula)}
        </View>
        <Text style={{
          color: theme.text,
          fontSize: 50,
          textAlign: 'right',
        }}>
          {currentNumber}
        </Text>
      </View>

      {/* Buttons */}
      <View style={{
        backgroundColor: theme.surface,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 30,
        elevation: 2,
      }}>
        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}>
          {buttons.map((row, rowIndex) => (
            <View 
              key={rowIndex}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
            >
              {row.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: button === '=' ? colors.accent : theme.button,
                  }}
                  onPress={() => {
                    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
                    if (numbers.includes(button)) {
                      handleNumber(button);
                    } else {
                      handleOperation(button);
                    }
                  }}
                >
                  {renderButton(button)}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
