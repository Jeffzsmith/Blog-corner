import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const submissions = [];

app.get("/home", (req, res) => {
    res.render("home.ejs", { submissions: submissions });
});

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/submit", (req, res) => {
    res.render("submit.ejs");
});

app.post("/submit", (req, res) => {
    const title = req.body["title"];
    const essay = req.body["essay"];
    submissions.push({ title: title, essay: essay });
    res.redirect("/home");
});

app.post("/delete/:index", (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < submissions.length) {
        submissions.splice(index, 1);
    }

    res.redirect("/home");
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < submissions.length) {
        const submission = submissions[index];
        res.render("edit.ejs", { index: index, title: submission.title, essay: submission.essay });
    } else {
        res.redirect("/home");
    }
});

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    const title = req.body["title"];
    const essay = req.body["essay"];

    if (index >= 0 && index < submissions.length) {
        submissions[index] = { title: title, essay: essay };
    }

    res.redirect("/home");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
