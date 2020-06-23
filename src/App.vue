<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Gradana Test</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/task1" class="nav-link">Task 1</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/task2" class="nav-link">Task 2</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/task3" class="nav-link">Task 3</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>
