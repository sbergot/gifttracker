using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Data.Migrations
{
    public partial class create_occurence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("ApplicationUserId", "Gifts", "OwnerId");

            migrationBuilder.AddColumn<int>(
                name: "PriceInCents",
                table: "Gifts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Gifts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceInCents",
                table: "Gifts");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Gifts");

            migrationBuilder.RenameColumn("OwnerId", "Gifts", "ApplicationUserId");
        }
    }
}
