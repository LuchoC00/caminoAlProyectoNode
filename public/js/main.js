const socket = io('/chat');

const isUsernameValid = (value) => {
  return value.length >= 3;
};
const isEmailValid = (value) => {
  const exprRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return exprRegular.test(value);
};

const sweetAlert = (title, text, inputValid) => {
  return Swal.fire({
    title,
    text,
    icon: 'info',
    input: 'text',
    inputValidator: inputValid,
    allowOutsideClick: false,
  });
};

const cargarDatos = (datos) => {
  chatList.innerHTML = '';
  datos.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('chatItemList');

    const usernameItem = document.createElement('p');
    usernameItem.classList.add('username');
    usernameItem.textContent = item.user.username + ':';

    const messageItem = document.createElement('p');
    messageItem.classList.add('message');
    messageItem.textContent = item.message;

    listItem.appendChild(usernameItem);
    listItem.appendChild(messageItem);

    chatList.appendChild(listItem);
  });
};

const user = {};
const chatbox = document.querySelector('#chatbox');
const chatList = document.querySelector('#chatList');
const chatEmail = document.querySelector('#email');

sweetAlert('bienvenido', 'Ingrese su nombre de usuario', (value) => {
  return (
    !isUsernameValid(value) &&
    'Necesitas identificarte con un nombre de usuario valido'
  );
}).then((result) => {
  user.username = result.value;

  sweetAlert(`Bienvenido ${user.username}`, 'ingrese su email', (value) => {
    return (
      !isEmailValid(value) && 'Necesitas identificarte con un email valido'
    );
  }).then((result) => {
    user.email = result.value;
    chatEmail.textContent = user.email;
    socket.emit('inicioUser', user);
  });
});

chatbox.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    socket.emit('message', { user, message: e.target.value });
    chatbox.value = '';
  }
});

socket.on('messages', (data) => {
  cargarDatos(data);
});
