export class Logger {
  private timestamp(): string {
    return new Date().toLocaleTimeString();
  }

  info(message: string): void {
    console.log(`[${this.timestamp()}] [INFO] ${message}`);
  }

  warning(message: string): void {
    console.warn(`[${this.timestamp()}] [WARNING] ${message}`);
  }

  error(message: string): void {
    console.error(`[${this.timestamp()}] [ERROR] ${message}`);
  }

  debug(message: string): void {
    console.log(`[${this.timestamp()}] [DEBUG] ${message}`);
  }

  success(message: string): void {
    console.log(`[${this.timestamp()}] [✓] ${message}`);
  }

  failed(message: string): void {
    console.log(`[${this.timestamp()}] [✗] ${message}`);
  }

  header(message: string): void {
    console.log('\n' + '='.repeat(60));
    console.log(`  ${message}`);
    console.log('='.repeat(60) + '\n');
  }

  section(message: string): void {
    console.log(`\n[${this.timestamp()}] >>> ${message}`);
  }
}