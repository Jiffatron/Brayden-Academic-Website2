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

# Plotting
plt.figure(figsize=(12, 6))                                          # Sets the size of the plot (Window)
plt.plot(price_paths, linewidth=1)                                   # Plots the price paths
plt.title("Monte Carlo Simulation of stock price (100 Paths)")       # Sets the title of the plot
plt.xlabel("Time Step (Days)")                                       # Sets the x-axis label
plt.ylabel("Price")                                                  # Sets the y-axis label
plt.grid(True)                                                       # Adds a grid to the plot
plt.show()                                                           # Shows the plot
