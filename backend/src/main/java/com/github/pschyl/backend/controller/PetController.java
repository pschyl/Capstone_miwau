package com.github.pschyl.backend.controller;

import com.github.pschyl.backend.dto.PetWOId;
import com.github.pschyl.backend.model.Pet;
import com.github.pschyl.backend.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService service;

    @GetMapping
    public List<Pet> getAllPets() {
        return service.getAllPets();
    }

    @PostMapping
    public Pet saveNewPet(@RequestBody PetWOId newPet) {
        return service.saveNewPet(newPet);
    }
}
