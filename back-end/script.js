import database from './database.js';

// Function to add a new product
function addProduct(name, quantity, price) {
  const newProduct = {
    id: database.products.length + 1,
    name,
    quantity,
    price
  };
  database.products.push(newProduct);
  updateTotals();
}

// Function to remove a product
function removeProduct(productId) {
  const index = database.products.findIndex(product => product.id === productId);
  if (index !== -1) {
    database.products.splice(index, 1);
    updateTotals();
  }
}

// Function to add a new retirada
function addRetirada(productId, quantity) {
  const newRetirada = {
    id: database.retirada.length + 1,
    productId,
    quantity,
    date: new Date().toISOString().split('T')[0]
  };
  database.retirada.push(newRetirada);
  updateTotals();
}

// Function to update the totals
function updateTotals() {
  let totalProducts = 0;
  let totalValue = 0;
  database.products.forEach(product => {
    totalProducts += product.quantity;
    totalValue += product.quantity * product.price;
  });
  database.totals.totalProducts = totalProducts;
  database.totals.totalValue = totalValue.toFixed(2);
}

// Example usage
addProduct("Product D", 40, 9.99);
addRetirada(1, 10);
console.log(database);
// Adicionar o ícone de SAC a todas as telas
document.addEventListener("DOMContentLoaded", function() {
  const sacIcon = document.getElementById("sac-icon");
  document.body.appendChild(sacIcon);
});
document.getElementById('logout-button').addEventListener('click', function() {
  // Remove o item de autenticação do armazenamento local
  localStorage.removeItem('loggedInUser');
  
  // Redireciona para a página de login
  window.location.href = 'login.html';
});
document.addEventListener('DOMContentLoaded', function() {
  const increaseButton = document.getElementById('increase-text-size');
  const decreaseButton = document.getElementById('decrease-text-size');
  
  increaseButton.addEventListener('click', function() {
      document.body.classList.add('large-text');
  });

  decreaseButton.addEventListener('click', function() {
      document.body.classList.remove('large-text');
  });
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('logout-button').addEventListener('click', function() {
      // Código para deslogar o usuário
      // Pode ser redirecionamento ou chamada para uma função de logout
      window.location.href = 'login.html'; // Exemplo de redirecionamento
  });
});
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  // Enviar essas informações para o servidor ou armazená-las conforme necessário
}
// script.js

// Armazenamento dos usuários no LocalStorage
function saveUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
}

// Autenticação do usuário
function authenticateUser(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(user => user.username === username && user.password === password);
}

// Inicialização: Criar usuário padrão se não existir
if (!localStorage.getItem('users')) {
  saveUser('admin', '123');
}

// Manipulação do formulário de login
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (authenticateUser(username, password)) {
      localStorage.setItem('loggedInUser', username);
      console.log('Login bem-sucedido! Redirecionando para a página principal...');
      window.location.href = 'index.html'; // Redireciona para a página principal
  } else {
      alert('Usuário ou senha incorretos!');
      console.log('Falha no login.');
  }
});
