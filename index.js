const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//----------------------------------------------

app.get("/", (req, res) => {
  console.log("hittt");

  res.status(200).json({ works: "yes" });
});

//--------------------------------------------------------

app.get("/getAllEmployees", async (req, res) => {
  try {
    const employee = await db.query("SELECT * FROM employee");
    console.log(employee.rows);

    res.status(200).json({ employees: employee.rows });
  } catch (err) {
    console.log(err);
  }

  console.log("-----------");
});

//-------------------------------------------------
app.post("/insertEmployee", async (req, res) => {
  try {
    await db.query(`INSERT INTO public.employee(
        id, lastName, firstName, bandLevel, projectId)
        VALUES (${req.body.id}, '${req.body.lastName}', '${req.body.firstName}', ${req.body.bandLevel}, ${req.body.projectId})`);
    return res.status(200).json({ status: "Insert was made successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});

// ----------------------------------------------------
app.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    await db.query(`DELETE FROM public.employee WHERE id='${req.params.id}'`);
    return res.status(200).json({ status: "Project was successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Something went wrong" });
  }
});

//--------------------------------------

app.get("/getAllProjects", async (req, res) => {
  try {
    const projects = await db.query("SELECT * FROM project");
    console.log(projects.rows);

    res.status(200).json({ projects: projects.rows });
  } catch (err) {
    console.log(err);
  }

  console.log("-------------------");
});

//--------------------------------------
app.post("/insertProject", async (req, res) => {
  try {
    await db.query(`INSERT INTO public.project(
        id, projectName, customerName)
        VALUES (${req.body.id}, '${req.body.projectName}', '${req.body.customerName}')`);
    const projects = await db.query("SELECT * FROM project");
    console.log(projects.rows);
    return res.status(200).json({ status: "Insert was made successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});

// ----------------------------------------------------
app.delete("/deleteProject/:id", async (req, res) => {
  try {
    await db.query(`DELETE FROM public.project WHERE id='${req.params.id}'`);
    return res.status(200).json({ status: "Project was successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Listed on port 3000");
});
