package com.sougoumay.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "image_model")
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(name = "name")
    private String name ;

    @Column(name = "type")
    private String type;

    @Column(length = 500000, name = "pic_byte")
    private byte[] picByte;

    @OneToOne(mappedBy = "image")
    private Product product;


    public ImageModel(String originalFilename, String contentType, byte[] bytes) {
        this.name = originalFilename;
        this.type = contentType;
        this.picByte = bytes;
    }

    public ImageModel() {

    }

}
