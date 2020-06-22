<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Gradana</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collpase id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>Task 1</b-nav-item>
          <b-nav-item>Task 2</b-nav-item>
          <b-nav-item>Task 3</b-nav-item>
        </b-navbar-nav>
      </b-collpase>
    </b-navbar>
    <router-view />
  </div>
</template>

<style>
</style>
