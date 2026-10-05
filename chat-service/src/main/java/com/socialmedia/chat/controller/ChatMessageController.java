package com.socialmedia.chat.controller;

import com.socialmedia.chat.model.ChatMessage;
import com.socialmedia.chat.service.ChatMessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class ChatMessageController {

    private final ChatMessageService service;

    public ChatMessageController(ChatMessageService service) {
        this.service = service;
    }

    @PostMapping
    public ChatMessage sendMessage(
            @RequestBody ChatMessage message) {

        return service.sendMessage(message);
    }

    @GetMapping("/{id}")
    public ChatMessage getMessage(
            @PathVariable Long id) {

        return service.getMessage(id);
    }

    @GetMapping("/user/{userId}")
    public List<ChatMessage> getMessages(
            @PathVariable Long userId) {

        return service.getMessages(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteMessage(
            @PathVariable Long id) {

        service.deleteMessage(id);

        return "Message deleted successfully";
    }
}