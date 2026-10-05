package com.socialmedia.media.controller;

import com.socialmedia.media.model.Media;
import com.socialmedia.media.service.MediaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/media")
public class MediaController {

    private final MediaService mediaService;

    private final Path uploadDirectory =
            Paths.get("uploads");

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Media> uploadMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Files.createDirectories(uploadDirectory);

        String fileName = System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        Path filePath = uploadDirectory.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
        );

        Media media = new Media();

        media.setUserId(userId);
        media.setFileName(file.getOriginalFilename());
        media.setFileType(file.getContentType());
        media.setFilePath(filePath.toString());

        return ResponseEntity.ok(
                mediaService.saveMedia(media)
        );
    }

    @GetMapping("/{id}")
    public Media getMedia(@PathVariable Long id) {
        return mediaService.getMediaById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Media> getUserMedia(
            @PathVariable Long userId) {

        return mediaService.getMediaByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteMedia(@PathVariable Long id) {

        Media media = mediaService.getMediaById(id);

        try {
            Files.deleteIfExists(
                    Paths.get(media.getFilePath())
            );
        } catch (IOException ignored) {
        }

        mediaService.deleteMedia(id);

        return "Media deleted successfully";
    }
}