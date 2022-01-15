const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const port = process.env.PORT || 3001;

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

const rules = auth.rewriter({
  users: 664, //user logado pode gravar . Todos podem ler.
  habits: 660, // user logado pode gravar e ler.
  groups: 660, // user logado pode gravar e ler.
  goals: 640, // user deve possuir para gravar. user logado pode ler.
  activities: 660, // user logado pode gravar e ler.
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
