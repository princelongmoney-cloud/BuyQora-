# BuyQora-
BuyQora — Online marketplace
index.html
style.css
index.html <script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("BuyQora app ready"))
        .catch(error => console.error("Service Worker error:", error));
    });
  }
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BuyQora - Shop Everything You Love</title> <link rel="manifest" href="manifest.json">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      color: #222;
    }

    header {
      background: #111;
      color: white;
      padding: 18px;
      text-align: center;
    }

    header h1 {
      font-size: 28px;
    }

    header p {
      margin-top: 6px;
      color: #ddd;
    }

    .hero {
      background: white;
      padding: 50px 20px;
      text-align: center;
    }

    .hero h2 {
      font-size: 34px;
      margin-bottom: 15px;
    }

    .hero p {
      font-size: 17px;
      color: #666;
      margin-bottom: 25px;
    }

    .button {
      display: inline-block;
      background: #ff6b00;
      color: white;
      padding: 14px 25px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
    }

    .categories {
      padding: 30px 20px;
      text-align: center;
    }

    .categories h2 {
      margin-bottom: 20px;
    }

    .category-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      max-width: 700px;
      margin: auto;
    }

    .category {
      background: white;
      padding: 25px 10px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .products {
      padding: 30px 20px;
      background: #fff;
      text-align: center;
    }

    .products h2 {
      margin-bottom: 20px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      max-width: 800px;
      margin: auto;
    }

    .product {
      border: 1px solid #eee;
      border-radius: 10px;
      padding: 15px;
      text-align: left;
    }

    .product-image {
      height: 130px;
      background: #eee;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      font-size: 40px;
    }

    .product h3 {
      font-size: 16px;
      margin-bottom: 7px;
    }

    .price {
      color: #ff6b00;
      font-weight: bold;
    }

    footer {
      background: #111;
      color: white;
      text-align: center;
      padding: 25px;
      margin-top: 30px;
    }

    @media (min-width: 700px) {
      .category-list {
        grid-template-columns: repeat(4, 1fr);
      }

      .product-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  </style>
</head>

<body>

  <header>
    <h1>BuyQora</h1>
    <p>Shop. Discover. Enjoy.</p>
  </header>

  <section class="hero">
    <h2>Everything You Need, All in One Place</h2>
    <p>Discover great products from sellers you can trust.</p>
    <a href="#products" class="button">Shop Now</a>
  </section>

  <section class="categories">
    <h2>Shop by Category</h2>

    <div class="category-list">
      <div class="category">📱 Electronics</div>
      <div class="category">👕 Fashion</div>
      <div class="category">🏠 Home & Living</div>
      <div class="category">💄 Beauty</div>
    </div>
  </section>

  <section class="products" id="products">
    <h2>Featured Products</h2>

    <div class="product-grid">

      <div class="product">
        <div class="product-image">📱</div>
        <h3>Smartphone</h3>
        <p class="price">₦150,000</p>
      </div>

      <div class="product">
        <div class="product-image">👟</div>
        <h3>Fashion Sneakers</h3>
        <p class="price">₦35,000</p>
      </div>

      <div class="product">
        <div class="product-image">🎧</div>
        <h3>Wireless Headphones</h3>
        <p class="price">₦25,000</p>
      </div>

      <div class="product">
        <div class="product-image">⌚</div>
        <h3>Smart Watch</h3>
        <p class="price">₦45,000</p>
      </div>

    </div>
  </section>

  <footer>
    <p>© 2026 BuyQora. All rights reserved.</p>
  </footer>

</body>
</html>