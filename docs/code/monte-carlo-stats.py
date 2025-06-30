# Demonstrating the capabilities of Python on Monte Carlo Simulations for Market Returns and Arbitrage Options Trading
# The Parameters serve as the inputs, simply input a stock price of your chosen stock and the expected return and volatility and the number of simulations you want to run
# These simulations are based on Geometric Brownian Motion and are not meant to be used for actual trading, but rather for educational purposes

import numpy as np                # NumPy is imported as np to handle the numerical operations and random number generation
import matplotlib.pyplot as plt   # Imported as a plt to plot the results

# Parameters (Inputs)
initial_price = 150               # Starting stock price
mu = 0.08                         # Expected annual return (Decimal)
sigma = 0.2                       # Annual volatility (Decimal)
T = 1                             # Time in years (Divide if you want to run for a shorter period)
steps = 252                       # Number of trading days in a year
n_simulations = 100               # Number of Monte Carlo paths to simulate (Visual results are best at lower numbers)

dt = T / steps                    # Time step

# Simulations
price_paths = np.zeros((steps, n_simulations))           # Creates a 2D array filled with zeros
price_paths[0] = initial_price                           # First row of each simulation is set to the initial price

for i in range(1, steps):                                # Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion
    rand = np.random.standard_normal(n_simulations)      # Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)
    price_paths[i] = price_paths[i - 1] * np.exp((mu - 0.5 * sigma ** 2) * dt + sigma * np.sqrt(dt) * rand)     #Takes the previous days price and multiplies it by the expected return and volatility to get the next days price

# Calculate statistics for final prices
final_prices = price_paths[-1]                   # Extract the last row (final day prices) from all simulation paths
mean_price = np.mean(final_prices)               # Calculate the arithmetic average of all final prices
median_price = np.median(final_prices)           # Find the middle value when final prices are sorted
min_price = np.min(final_prices)                 # Find the lowest final price across all simulations
max_price = np.max(final_prices)                 # Find the highest final price across all simulations
std_price = np.std(final_prices)                 # Calculate standard deviation (measure of price spread/volatility)

# Calculate all percentiles (values below which a certain percentage of data falls)
percentile_5 = np.percentile(final_prices, 5)    # 5% of final prices are below this value
percentile_10 = np.percentile(final_prices, 10)  # 10% of final prices are below this value
percentile_25 = np.percentile(final_prices, 25)  # 25% of final prices are below this value (1st quartile)
percentile_50 = np.percentile(final_prices, 50)  # 50% of final prices are below this value (median/2nd quartile)
percentile_75 = np.percentile(final_prices, 75)  # 75% of final prices are below this value (3rd quartile)
percentile_90 = np.percentile(final_prices, 90)  # 90% of final prices are below this value
percentile_95 = np.percentile(final_prices, 95)  # 95% of final prices are below this value

# Plotting section - Create and customize the graph
plt.figure(figsize=(12, 8))                                          # Create a new figure window with width=12 inches, height=8 inches
plt.plot(price_paths, linewidth=1)                                   # Plot all price paths as lines with thickness of 1 pixel
plt.title("Monte Carlo Simulation of Stock Price (100 Paths)")        # Adds a title at the top of the graph
plt.xlabel("Time Step (Days)")                                       # Label the horizontal axis as trading days
plt.ylabel("Price")                                                  # Label the vertical axis as stock price
plt.grid(True)                                                       # Add a grid overlay to make reading values easier

# Create formatted text string containing all statistical information
stats_text = f"""Statistical Summary of Final Prices:
Mean: ${mean_price:.2f}    Median: ${median_price:.2f}    Std Dev: ${std_price:.2f}
Min: ${min_price:.2f}    Max: ${max_price:.2f}    Range: ${max_price - min_price:.2f}

Percentile Distribution:
5th: ${percentile_5:.2f}    10th: ${percentile_10:.2f}    25th: ${percentile_25:.2f}    50th: ${percentile_50:.2f}
75th: ${percentile_75:.2f}    90th: ${percentile_90:.2f}    95th: ${percentile_95:.2f}

Initial Price: ${initial_price:.2f}    Expected Return: {mu*100:.1f}%    Volatility: {sigma*100:.1f}%"""  # Format all statistics into a multi-line string with 2 decimal places

# Position the statistics text at the bottom center of the figure
plt.figtext(0.5, 0.02, stats_text, fontsize=10, family='monospace', ha='center',    # Place text at x=0.5 (center), y=0.02 (bottom), center-aligned
            bbox=dict(boxstyle="round,pad=0.5", facecolor="lightgray", alpha=0.8))  # Adds rounded rectangle background, light gray, 80% opacity

plt.tight_layout()                                                   # Automatically adjust subplot parameters to fit the figure area
plt.subplots_adjust(bottom=0.27)                                     # Reserve 27% of figure height at bottom for statistics text
plt.show()                                                           # Display the completed graph with statistics on screen