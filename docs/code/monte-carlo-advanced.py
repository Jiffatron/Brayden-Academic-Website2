# Demonstrating the capabilities of Python on Monte Carlo Simulations for Market Returns and Arbitrage Options Trading
# The Parameters serve as the inputs, simply input a stock price of your chosen stock and the expected return and volatility and the number of simulations you want to run
# These simulations are based on Geometric Brownian Motion and are not meant to be used for actual trading, but rather for educational purposes

import numpy as np                # Numpy is imported as np to handle the numerical operations and random number generation
import matplotlib.pyplot as plt   # Imported as a plt to plot the results

# Parameters (Inputs)
initial_price = 100               # Starting stock price
mu = 0.08                         # Expected annual return (Decimal)
sigma = 0.2                       # Annual volatility (Decimal)
T = 1                             # Time in years (Divide if you want to run for a shorter period)
steps = 252                       # Number of trading days in a year
n_simulations = 50              # Number of Monte Carlo paths to simulate (Visual results are best at lower numbers)

dt = T / steps                    # Time step

# TOGGLE: Set to True to run 100 iterations of the entire simulation, False for single simulation
run_multiple_iterations = True   # Change this to False to disable the 100-iteration function

def run_single_gbm_simulation():
    """
    Function to run a single GBM simulation with the current parameters
    Returns the price paths array for one complete simulation
    """
    # Create price paths array for this simulation
    paths = np.zeros((steps, n_simulations))           # Creates a 2D array filled with zeros
    paths[0] = initial_price                           # First row of each simulation is set to the initial price

    # Run the GBM simulation
    for i in range(1, steps):                          # Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion
        rand = np.random.standard_normal(n_simulations) # Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)
        paths[i] = paths[i - 1] * np.exp((mu - 0.5 * sigma ** 2) * dt + sigma * np.sqrt(dt) * rand) # Takes the previous days price and multiplies it by the expected return and volatility to get the next days price

    return paths

# Simulations - Choose between single simulation or 100 iterations
if run_multiple_iterations:
    # Run 100 iterations of the entire GBM simulation
    print("Running 100 iterations of GBM simulation...")
    iterations = 100                                     # Number of complete simulation iterations to run
    all_iterations = []                                  # List to store all iteration results
    all_final_prices = []                               # List to store all final prices from all iterations

    for iteration in range(iterations):                  # Loop through 100 complete simulations
        iteration_paths = run_single_gbm_simulation()    # Run one complete GBM simulation
        all_iterations.append(iteration_paths)           # Store the complete price paths
        all_final_prices.extend(iteration_paths[-1])    # Add final prices to our master list

        # Progress indicator
        if (iteration + 1) % 20 == 0:                   # Print progress every 20 iterations
            print(f"Completed {iteration + 1}/100 iterations")

    # Convert to numpy array for easier handling
    all_final_prices = np.array(all_final_prices)       # Convert list to numpy array for statistical calculations
    print(f"Total simulations completed: {iterations} iterations × {n_simulations} paths = {len(all_final_prices)} total paths")

else:
    # Original single simulation
    price_paths = np.zeros((steps, n_simulations))           # Creates a 2D array filled with zeros
    price_paths[0] = initial_price                           # First row of each simulation is set to the initial price

    for i in range(1, steps):                                # Sets up a basic loop that calculates the next days stock price based on Geometric Brownian Motion
        rand = np.random.standard_normal(n_simulations)      # Creates n_simulations random numbers from a standard normal distribution (mean = 0, std = 1)
        price_paths[i] = price_paths[i - 1] * np.exp((mu - 0.5 * sigma ** 2) * dt + sigma * np.sqrt(dt) * rand)     #Takes the previous days price and multiplies it by the expected return and volatility to get the next days price

# Calculate statistics for final prices (handles both single and multiple iterations)
if run_multiple_iterations:
    # Use all final prices from all 100 iterations
    final_prices = all_final_prices                 # Use the combined final prices from all iterations
    total_paths = len(all_final_prices)             # Total number of price paths across all iterations
else:
    # Use final prices from single simulation
    final_prices = price_paths[-1]                  # Extract the last row (final day prices) from all simulation paths
    total_paths = n_simulations                     # Total paths is just the number of simulations

# Calculate basic statistics
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

# Plotting section - Create and customize the graph (handles both single and multiple iterations)
if run_multiple_iterations:
    # Create large figure for 100 iterations
    plt.figure(figsize=(16, 10))                                     # Create extra large figure window for multiple iterations

    # Plot all iterations with different colors like the original single simulation
    for iteration_idx, iteration_paths in enumerate(all_iterations): # Loop through each of the 100 iterations
        plt.plot(iteration_paths, linewidth=0.5, alpha=0.3)         # Plot each iteration with automatic color cycling and moderate transparency

    plt.title(f"Monte Carlo Simulation: 100 Iterations × {n_simulations} Paths = {total_paths} Total Paths", fontsize=14, fontweight='bold') # Title showing total scope

else:
    # Original single simulation plotting
    plt.figure(figsize=(12, 8))                                     # Create a new figure window with width=12 inches, height=8 inches
    plt.plot(price_paths, linewidth=1)                              # Plot all price paths as lines with thickness of 1 pixel
    plt.title(f"Monte Carlo Simulation of Stock Price ({n_simulations} Paths)", fontsize=14, fontweight='bold') # Title for single simulation
# Common plotting elements for both modes
plt.xlabel("Time Step (Days)", fontsize=12)                         # Label the horizontal axis as trading days
plt.ylabel("Price ($)", fontsize=12)                                # Label the vertical axis as stock price
plt.grid(True, alpha=0.3)                                           # Add a grid overlay to make reading values easier

# Create formatted text string containing all statistical information
if run_multiple_iterations:
    # Statistics text for multiple iterations
    stats_text = f"""Statistical Summary of Final Prices (100 Iterations):
Mean: ${mean_price:.2f}    Median: ${median_price:.2f}    Std Dev: ${std_price:.2f}
Min: ${min_price:.2f}    Max: ${max_price:.2f}    Range: ${max_price - min_price:.2f}

Percentile Distribution:
5th: ${percentile_5:.2f}    10th: ${percentile_10:.2f}    25th: ${percentile_25:.2f}    50th: ${percentile_50:.2f}
75th: ${percentile_75:.2f}    90th: ${percentile_90:.2f}    95th: ${percentile_95:.2f}

Total Paths: {total_paths} ({100} iterations × {n_simulations} paths each)
Initial Price: ${initial_price:.2f}    Expected Return: {mu*100:.1f}%    Volatility: {sigma*100:.1f}%"""  # Format statistics for multiple iterations

else:
    # Statistics text for single simulation
    stats_text = f"""Statistical Summary of Final Prices:
Mean: ${mean_price:.2f}    Median: ${median_price:.2f}    Std Dev: ${std_price:.2f}
Min: ${min_price:.2f}    Max: ${max_price:.2f}    Range: ${max_price - min_price:.2f}

Percentile Distribution:
5th: ${percentile_5:.2f}    10th: ${percentile_10:.2f}    25th: ${percentile_25:.2f}    50th: ${percentile_50:.2f}
75th: ${percentile_75:.2f}    90th: ${percentile_90:.2f}    95th: ${percentile_95:.2f}

Initial Price: ${initial_price:.2f}    Expected Return: {mu*100:.1f}%    Volatility: {sigma*100:.1f}%"""  # Format statistics for single simulation

# Position the statistics text at the bottom center of the figure
plt.figtext(0.5, 0.02, stats_text, fontsize=10, family='monospace', ha='center',    # Place text at x=0.5 (center), y=0.02 (bottom), center-aligned
            bbox=dict(boxstyle="round,pad=0.5", facecolor="lightgray", alpha=0.8))  # Adds rounded rectangle background, light gray, 80% opacity

plt.tight_layout()                                                   # Automatically adjust subplot parameters to fit the figure area
plt.subplots_adjust(bottom=0.27)                                     # Reserve 27% of figure height at bottom for statistics text
plt.show()                                                           # Display the completed graph with statistics on screen
