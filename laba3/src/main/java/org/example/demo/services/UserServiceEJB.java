package org.example.demo.services;

import jakarta.jws.soap.SOAPBinding;
import jakarta.transaction.Transactional;
import org.example.demo.utils.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Stateless
public class UserServiceEJB {

    @PersistenceContext(unitName = "myPU")  // Указывайте ваш persistence unit
    private EntityManager entityManager;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public User registerUser(String username, String password) {
        // Проверка на существование пользователя
        TypedQuery<User> query = entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
        query.setParameter("username", username);

        if (!query.getResultList().isEmpty()) {
            throw new IllegalArgumentException("Пользователь с таким именем уже существует");
        }

       String hashedPassword = passwordEncoder.encode(password);

        System.out.println("Username: " + username);
        System.out.println("Password: " + hashedPassword);

        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Имя пользователя не может быть null или пустым");
        }
        if (hashedPassword == null || hashedPassword.isEmpty()) {
            throw new IllegalArgumentException("Пароль не может быть null или пустым");
        }

        User newUser = new User(username, hashedPassword);
        System.out.println("Saving user: " + newUser.getUsername() + ", " + newUser.getPasswordHash());
        entityManager.persist(newUser);
        return newUser;
    }

    @Transactional
    public User authenticateUser(String username, String password) {

        TypedQuery<User> query = entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
        query.setParameter("username", username);

        User user = query.getResultList().stream().findFirst().orElse(null);
        if (user == null) {
            return null;
        }
        System.out.println(user.getUsername());

        if (passwordEncoder.matches(password, user.getPasswordHash())) {
            return user;
        }
        return null;
    }

    @Transactional
    public void setSession(User user, boolean newSession) {
        user.setSession(newSession);
        entityManager.merge(user);
    }
}
