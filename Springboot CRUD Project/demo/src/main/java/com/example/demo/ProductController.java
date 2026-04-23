package com.example.demo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

//Handles the url mapping
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAll(){
        return ResponseEntity.ok().body(productService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id){
        return ResponseEntity.ok().body(productService.getById(id));
    }
    
    @PostMapping
    public ResponseEntity<List<Product>> addProduct(@RequestBody Product product) {
        productService.addProduct(product);
        return ResponseEntity.ok().body(productService.getAll());
    }

    //Put the update mapping here
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
	if (productService.updateProduct(id, product) != null) {
	    return ResponseEntity.ok().body(productService.getById(id));
	}
	return ResponseEntity.badRequest().body(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Product>> deleteById(@PathVariable Long id){
        productService.deleteById(id);
        return ResponseEntity.ok().body(productService.getAll());
    }
    
}
