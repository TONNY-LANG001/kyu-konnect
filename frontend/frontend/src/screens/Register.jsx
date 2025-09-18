export default function Register() {
  function handleGoogleSignIn() {
    alert("Google Sign-In not yet implemented");
  }
  function handleFacebookSignIn() {
    alert("Facebook Sign-In not yet implemented");
  }
  function handleXSignIn() {
    alert("X(Twitter) Sign-In not yet implemented");
  }
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>Create Account / Sign In</h2>
      <form style={{ margin: "2rem auto", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input placeholder="Full Name" />
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <p>Or continue with:</p>
      <button onClick={handleGoogleSignIn} style={{ margin: "0.5rem" }}>Google</button>
      <button onClick={handleFacebookSignIn} style={{ margin: "0.5rem" }}>Facebook</button>
      <button onClick={handleXSignIn} style={{ margin: "0.5rem" }}>X</button>
    </div>
  );
}
