package com.socialmedia.notification.controller;

import com.socialmedia.notification.model.Notification;
import com.socialmedia.notification.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification) {

        return notificationService.createNotification(notification);
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(
            @PathVariable Long id) {

        return notificationService.getNotificationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUserId(
            @PathVariable Long userId) {

        return notificationService.getNotificationsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return "Notification deleted successfully";
    }
}