package webprogr.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class CinemaRep {

    @Autowired
    private JdbcTemplate db;

    public void saveTicket(Tickets ticket) {

        String sql = "INSERT INTO Tickets (movie, amount, first_name, surname, phone, email) VALUES(?,?,?,?,?,?)";

        db.update(sql, ticket.getMovie(), ticket.getAmount(), ticket.getFirst_name(), ticket.getSurname(), ticket.getPhone(), ticket.getEmail());

    }

    public List<Tickets> fetchTickets() {
        String sql = "SELECT * FROM Tickets ORDER BY surname";
        return db.query(sql, new BeanPropertyRowMapper<>(Tickets.class));
    }

    public List<Movies> retrieveMovie() {
        String sql = "SELECT * FROM Movies";
        return db.query(sql, new BeanPropertyRowMapper<>(Movies.class));
    }

    public void deleteTickets() {
        String sql = "DELETE FROM Tickets";
        db.update(sql);
    }


}
