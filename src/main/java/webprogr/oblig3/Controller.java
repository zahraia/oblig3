package webprogr.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {

    @Autowired
     CinemaRep rep;

    @PostMapping("/saveTicket")
    public void saveTicket(Tickets ticket){
        rep.saveTicket(ticket);
    }

    @GetMapping("/fetchTickets")
        public List<Tickets> fetchTickets(){
            return rep.fetchTickets();
        }


    @GetMapping("/retrieveMovies")
    public List<Movies> retrieveMovies(){
        return rep.retrieveMovie();
    }

    @GetMapping("/deleteTickets")
    public void deleteTickets(){
        rep.deleteTickets();
    }


}
