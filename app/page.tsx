import classes from "./page.module.scss";
import Welcome from "./components/Welcome";

export default function Home() {
  return (
    <main className={classes.container}>
      <Welcome />
    </main>
  );
}
