package com.socialmedia.chat.repository;

import com.socialmedia.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findBySenderIdOrReceiverId(
            Long senderId,
            Long receiverId
    );
}