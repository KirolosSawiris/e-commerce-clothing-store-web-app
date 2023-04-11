package com.shop.webshop.security;

//import com.shop.webshop.filter.CustomAuthenticationFilter;
import com.shop.webshop.filter.CustomAuthenticationFilter;
import com.shop.webshop.filter.CustomAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;
//    @Autowired
//    private PasswordEncoder passwordEncoder;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
//        auth.inMemoryAuthentication().withUser("kiro")
//                .password("{noop}1234").roles("ADMIN");
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http.csrf().disable();
      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
      http.authorizeRequests().antMatchers("/login").permitAll();
      http.authorizeRequests().anyRequest().authenticated();
      http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
      http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

    }



    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }
    @Bean
	PasswordEncoder passwordEncoder(){
		return NoOpPasswordEncoder.getInstance();
	}

}
