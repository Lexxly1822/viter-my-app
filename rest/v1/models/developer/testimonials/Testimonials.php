<?php
class Testimonials
{
    //COLOUM
    public $testimonials_aid; //coloum
    public $testimonials_is_active;
    public $testimonials_image;
    public $testimonials_description;
    public $testimonials_name;
    public $testimonials_position;
    public $testimonials_created;
    public $testimonials_updated;

    public $connection; // variable for connection to database
    public $lastInsertedId; //when created is used store last inserted

    public $tblTestimonials; //table

    //when this file is used run this function
    public function __construct($db)
    {
        $this->connection = $db; // connection of database
        $this->tblTestimonials = 'my_app_testimonials'; //table

    }
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= "{$this->tblTestimonials} ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    //creating data using this function
    public function create()
    {
        try {
            $sql = "insert into {$this->tblTestimonials} ( ";
            $sql .= "testimonials_is_active, "; //kung anong value i-insert
            $sql .= "testimonials_image, ";
            $sql .= "testimonials_description, ";
            $sql .= "testimonials_name, ";
            $sql .= "testimonials_position, ";
            $sql .= "testimonials_created, ";
            $sql .= "testimonials_updated ) values ( ";
            $sql .= ":testimonials_is_active, ";
            $sql .= ":testimonials_image, ";
            $sql .= ":testimonials_description, ";
            $sql .= ":testimonials_name, ";
            $sql .= ":testimonials_position, ";
            $sql .= ":testimonials_created, ";
            $sql .= ":testimonials_updated ) ";
            $query = $this->connection->prepare($sql); //to ready your query
            $query->execute([
                "testimonials_is_active" => $this->testimonials_is_active, //kung anong meron sa try meron din dito
                "testimonials_image" => $this->testimonials_image,
                "testimonials_description" => $this->testimonials_description,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_created" => $this->testimonials_created,
                "testimonials_updated" => $this->testimonials_updated,
            ]); //to run this sql
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            returnError($ex);
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblTestimonials} set ";
            $sql .= "testimonials_image = :testimonials_image, ";
            $sql .= "testimonials_description = :testimonials_description, ";
            $sql .= "testimonials_name = :testimonials_name, ";
            $sql .= "testimonials_position = :testimonials_position, ";
            $sql .= "testimonials_updated = :testimonials_updated ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_image" => $this->testimonials_image,
                "testimonials_description" => $this->testimonials_description,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_updated" => $this->testimonials_updated,
                "testimonials_aid" => $this->testimonials_aid,
            ]);
        } catch (PDOException $ex) {
            returnError($ex);
            $query = false;
        }
        return $query;
    }
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblTestimonials} ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_aid" => $this->testimonials_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
