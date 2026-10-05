package com.socialmedia.chat.service;

import com.socialmedia.chat.model.ChatMessage;
import com.socialmedia.chat.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    private final ChatMessageRepository repository;

    public ChatMessageService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    public ChatMessage sendMessage(ChatMessage message) {
        return repository.save(message);
    }

    public List<ChatMessage> getMessages(Long userId) {
        return repository.findBySenderIdOrReceiverId(userId, userId);
    }

    public ChatMessage getMessage(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Message not found"));
    }

    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }
}