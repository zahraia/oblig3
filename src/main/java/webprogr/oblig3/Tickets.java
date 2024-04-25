package webprogr.oblig3;

public class Tickets {

    private String first_name;
    private String surname;
    private String phone;
    private String email;
    private String movie;
    private String amount;



    public Tickets(String first_name, String surname, String phone, String email, String movie, String amount){
        this.movie = movie;
        this.amount = amount;
        this.first_name = first_name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;

    }

    public Tickets(){}

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String number) {
        this.amount = number;
    }
}
