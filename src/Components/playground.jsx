<form onSubmit={this.handleSignUpFormSubmit} class="UpdateForm">
  <input
    type="text"
    name="firstname"
    placeholder="first name"
    onChange={this.handleFormUpdate}
  />
  <input
    type="text"
    name="lastname"
    placeholder="last name"
    onChange={this.handleFormUpdate}
  />
  <input
    type="text"
    name="email"
    placeholder="email"
    onChange={this.handleFormUpdate}
  />
</form>;
