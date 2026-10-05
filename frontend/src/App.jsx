import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, setNewPost] = useState("");

  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  const [chatMessage, setChatMessage] = useState("");
  const [receiverId, setReceiverId] = useState(2);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const [activeMenu, setActiveMenu] = useState("Home");

  // Current logged-in/demo user
  const currentUserId = 1;

  useEffect(() => {
    loadPosts();
    loadUsers();
    loadNotifications();
    loadMessages();
  }, []);

  // =========================
  // POSTS
  // =========================

  const loadPosts = async () => {
    try {
      const response = await fetch(`${API}/api/posts`);

      if (!response.ok) {
        throw new Error("Failed to load posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Post loading error:", error);
    }
  };

  const createPost = async () => {
    if (!newPost.trim()) {
      alert("Please write something!");
      return;
    }

    try {
      const response = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          content: newPost,
        }),
      });

      if (response.ok) {
        setNewPost("");
        await loadPosts();
        alert("Post created successfully!");
      } else {
        alert("Unable to create post");
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("Post service is not available");
    }
  };

  // =========================
  // LIKE
  // =========================

  const likePost = async (postId) => {
    try {
      const response = await fetch(`${API}/api/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          postId: postId,
        }),
      });

      if (response.ok) {
        alert("Post liked!");
      } else {
        alert("You may have already liked this post.");
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  // =========================
  // COMMENTS
  // =========================

  const loadComments = async (postId) => {
    try {
      const response = await fetch(
        `${API}/api/comments/post/${postId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load comments");
      }

      const data = await response.json();

      setComments((prev) => ({
        ...prev,
        [postId]: data,
      }));
    } catch (error) {
      console.error("Comment loading error:", error);
    }
  };

  const addComment = async (postId) => {
    const text = commentText[postId];

    if (!text?.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          postId: postId,
          content: text,
        }),
      });

      if (response.ok) {
        setCommentText((prev) => ({
          ...prev,
          [postId]: "",
        }));

        await loadComments(postId);

        // Create notification for demo
        await createNotification(
          postId,
          "You have a new comment on your post"
        );
      } else {
        alert("Unable to add comment");
      }
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  // =========================
  // USERS
  // =========================

  const loadUsers = async () => {
    try {
      const response = await fetch(`${API}/api/users`);

      if (!response.ok) {
        throw new Error("Failed to load users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("User loading error:", error);
    }
  };

  // =========================
  // NOTIFICATIONS
  // =========================

  const loadNotifications = async () => {
    try {
      const response = await fetch(
        `${API}/api/notifications/user/${currentUserId}`
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.log("Notification GET API not available.");
    }
  };

  const createNotification = async (postId, message) => {
    try {
      const response = await fetch(`${API}/api/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          message: message,
          read: false,
        }),
      });

      if (response.ok) {
        await loadNotifications();
      }
    } catch (error) {
      console.error("Notification error:", error);
    }
  };

  // =========================
  // CHAT
  // =========================

  const loadMessages = async () => {
    try {
      const response = await fetch(
        `${API}/api/messages/user/${currentUserId}`
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log("Message GET API not available.");
    }
  };

  const sendMessage = async () => {
    if (!chatMessage.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: Number(receiverId),
          message: chatMessage,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setMessages((prev) => [...prev, data]);
        setChatMessage("");

        alert("Message sent successfully!");
      } else {
        alert("Unable to send message");
      }
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  // =========================
  // MEDIA UPLOAD
  // =========================

  const uploadMedia = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("userId", currentUserId);

      const response = await fetch(`${API}/api/media/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Upload response:", data);

        setUploadStatus("File uploaded successfully!");
        setSelectedFile(null);
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      console.error("Media upload error:", error);
      setUploadStatus("Media service is not available.");
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="app">

      {/* TOP BAR */}
      <header className="topbar">

        <div className="logo">
          Social<span>Connect</span>
        </div>

        <div className="search">
          🔍
          <input placeholder="Search..." />
        </div>

        <div className="profile">
          👤 Mangesh
        </div>

      </header>

      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <button
            className={activeMenu === "Home" ? "active" : ""}
            onClick={() => setActiveMenu("Home")}
          >
            🏠 Home
          </button>

          <button
            className={activeMenu === "Users" ? "active" : ""}
            onClick={() => setActiveMenu("Users")}
          >
            👥 Users
          </button>

          <button
            className={activeMenu === "Chat" ? "active" : ""}
            onClick={() => setActiveMenu("Chat")}
          >
            💬 Chat
          </button>

          <button
            className={activeMenu === "Notifications" ? "active" : ""}
            onClick={() => {
              setActiveMenu("Notifications");
              loadNotifications();
            }}
          >
            🔔 Notifications
          </button>

          <button
            className={activeMenu === "Media" ? "active" : ""}
            onClick={() => setActiveMenu("Media")}
          >
            📁 Media
          </button>

        </aside>

        {/* MAIN CONTENT */}
        <main className="content">

          {/* ================= HOME ================= */}

          {activeMenu === "Home" && (
            <>
              <section className="create-post">

                <h2>Create Post</h2>

                <textarea
                  value={newPost}
                  onChange={(e) =>
                    setNewPost(e.target.value)
                  }
                  placeholder="What's on your mind?"
                />

                <button onClick={createPost}>
                  Post
                </button>

              </section>

              <h2 className="section-title">
                Latest Posts
              </h2>

              {posts.length === 0 ? (
                <p>No posts available.</p>
              ) : (
                posts.map((post) => (
                  <article
                    className="post"
                    key={post.id}
                  >

                    <div className="post-header">

                      <div className="avatar">
                        👤
                      </div>

                      <div>
                        <strong>
                          User {post.userId}
                        </strong>

                        <small>
                          Post #{post.id}
                        </small>
                      </div>

                    </div>

                    <p className="post-content">
                      {post.content}
                    </p>

                    <div className="post-actions">

                      <button
                        onClick={() =>
                          likePost(post.id)
                        }
                      >
                        ❤️ Like
                      </button>

                      <button
                        onClick={() =>
                          loadComments(post.id)
                        }
                      >
                        💬 Comments
                      </button>

                    </div>

                    {/* COMMENTS */}

                    {comments[post.id] && (
                      <div className="comments">

                        {comments[post.id].length === 0 ? (
                          <p>No comments yet.</p>
                        ) : (
                          comments[post.id].map(
                            (comment) => (
                              <div
                                className="comment"
                                key={comment.id}
                              >

                                <strong>
                                  User {comment.userId}
                                </strong>

                                <span>
                                  {comment.content}
                                </span>

                              </div>
                            )
                          )
                        )}

                      </div>
                    )}

                    {/* ADD COMMENT */}

                    <div className="comment-box">

                      <input
                        value={
                          commentText[post.id] || ""
                        }
                        onChange={(e) =>
                          setCommentText({
                            ...commentText,
                            [post.id]:
                              e.target.value,
                          })
                        }
                        placeholder="Write a comment..."
                      />

                      <button
                        onClick={() =>
                          addComment(post.id)
                        }
                      >
                        Send
                      </button>

                    </div>

                  </article>
                ))
              )}
            </>
          )}

          {/* ================= USERS ================= */}

          {activeMenu === "Users" && (
            <section className="panel">

              <h2>👥 Users</h2>

              {users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                users.map((user) => (
                  <div
                    className="user-card"
                    key={user.id}
                  >

                    <div className="avatar">
                      👤
                    </div>

                    <div>
                      <strong>
                        {user.name}
                      </strong>

                      <p>
                        {user.email}
                      </p>

                    </div>

                  </div>
                ))
              )}

            </section>
          )}

          {/* ================= CHAT ================= */}

          {activeMenu === "Chat" && (
            <section className="panel">

              <h2>💬 Chat</h2>

              <div className="chat-info">
                Send messages through the Chat Microservice.
              </div>

              <div className="chat-form">

                <label>
                  Receiver User ID
                </label>

                <input
                  type="number"
                  value={receiverId}
                  onChange={(e) =>
                    setReceiverId(e.target.value)
                  }
                />

                <label>
                  Message
                </label>

                <input
                  value={chatMessage}
                  onChange={(e) =>
                    setChatMessage(e.target.value)
                  }
                  placeholder="Type your message..."
                />

                <button onClick={sendMessage}>
                  Send Message
                </button>

              </div>

              <h3>Messages</h3>

              <div className="messages">

                {messages.length === 0 ? (
                  <p>No messages loaded.</p>
                ) : (
                  messages.map((message) => (
                    <div
                      className="message-card"
                      key={message.id}
                    >

                      <strong>
                        User {message.senderId}
                      </strong>

                      <span>
                        → User {message.receiverId}
                      </span>

                      <p>
                        {message.message}
                      </p>

                    </div>
                  ))
                )}

              </div>

            </section>
          )}

          {/* ================= NOTIFICATIONS ================= */}

          {activeMenu === "Notifications" && (
            <section className="panel">

              <h2>🔔 Notifications</h2>

              {notifications.length === 0 ? (
                <div className="empty-state">
                  <p>
                    No notifications available.
                  </p>

                  <small>
                    Notification Service is running.
                  </small>
                </div>
              ) : (
                notifications.map(
                  (notification) => (
                    <div
                      className="notification-card"
                      key={notification.id}
                    >

                      <div>
                        🔔
                      </div>

                      <div>
                        <strong>
                          Notification
                        </strong>

                        <p>
                          {notification.message}
                        </p>

                        <small>
                          {notification.read
                            ? "Read"
                            : "Unread"}
                        </small>
                      </div>

                    </div>
                  )
                )
              )}

            </section>
          )}

          {/* ================= MEDIA ================= */}

          {activeMenu === "Media" && (
            <section className="panel">

              <h2>📁 Media Upload</h2>

              <p>
                Upload images, videos or other files
                using the Media Microservice.
              </p>

              <div className="upload-box">

                <input
                  type="file"
                  onChange={(e) =>
                    setSelectedFile(
                      e.target.files[0]
                    )
                  }
                />

                {selectedFile && (
                  <p>
                    Selected:{" "}
                    <strong>
                      {selectedFile.name}
                    </strong>
                  </p>
                )}

                <button onClick={uploadMedia}>
                  Upload File
                </button>

                {uploadStatus && (
                  <p className="upload-status">
                    {uploadStatus}
                  </p>
                )}

              </div>

            </section>
          )}

        </main>

        {/* RIGHT BAR */}
        <aside className="rightbar">

          <div className="info-card">

            <h3>Microservices</h3>

            <p>🟢 User Service</p>
            <p>🟢 Post Service</p>
            <p>🟢 Like Service</p>
            <p>🟢 Comment Service</p>
            <p>🟢 Notification Service</p>
            <p>🟢 Chat Service</p>
            <p>🟢 Media Service</p>

          </div>

          <div className="info-card">

            <h3>System</h3>

            <p>🚀 API Gateway :8080</p>
            <p>🔎 Eureka :8761</p>
            <p>🗄️ PostgreSQL</p>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default App;