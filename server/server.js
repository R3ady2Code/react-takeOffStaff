import fs from 'fs';
import bodyParser from 'body-parser';
import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';

const PORT = 5000;

const app = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jsonServer.defaults());

const SECRET_KEY = '495495495';

const expiresIn = '1hr';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated({ login, password }) {
  return (
    userdb.users.findIndex((user) => user.login === login && user.password === password) !== -1
  );
}

function isUserCreateYeat(login) {
  return userdb.users.findIndex((user) => user.login === login) !== -1;
}

app.post('/api/auth/register', (req, res) => {
  const { login, password } = req.body;
  if (isUserCreateYeat(login)) {
    const message = 'Пользователь с таким логином уже существует';
    return res.status(401).json({ message });
  }

  fs.readFile('./db.json', (err, data) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }
    data = JSON.parse(data.toString());

    const newUserId = data.users.length + 1;

    data.users.push({ id: newUserId, login: login, password: password });
    let writeData = fs.writeFile('./db.json', JSON.stringify(data), (err, result) => {
      if (err) {
        res.status(401).json({ message: err.message });
        return;
      }
    });
  });
  const access_token = createToken({ login, password });
  res.status(200).json({ access_token, login });
});

app.post('/api/auth/login', (req, res) => {
  const { login, password } = req.body;
  if (!isAuthenticated({ login, password })) {
    const message = 'Неправильный логин или пароль';
    res.status(401).json({ message });
  }
  const access_token = createToken({ login, password });
  res.status(200).json({ access_token, login });
});

app.listen(PORT, () => {
  console.log('Fakeserver listening on');
});
