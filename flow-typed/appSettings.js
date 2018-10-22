export class AppServerSettings {
  hostname: string;
  port: number;
}

export class DbServerSettings {
  hostname: string;
  port: number;
}

export class AppSettings {
  appServer: AppServerSettings = new AppServerSettings();
  dbServer: DbServerSettings = new DbServerSettings();
}
