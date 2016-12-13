using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace gifttracker.Migrations
{
    public partial class create_event : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Occurences");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Occurences");

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGeneratedOnAdd", true),
                    Type = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.AddColumn<int>(
                name: "EventId",
                table: "Occurences",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Occurences_EventId",
                table: "Occurences",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurences_Events_EventId",
                table: "Occurences",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurences_Events_EventId",
                table: "Occurences");

            migrationBuilder.DropIndex(
                name: "IX_Occurences_EventId",
                table: "Occurences");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "Occurences");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Occurences",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Occurences",
                nullable: false,
                defaultValue: 0);
        }
    }
}
